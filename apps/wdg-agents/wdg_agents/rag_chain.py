import os

import chromadb
from chromadb import EmbeddingFunction, Documents

from chromadb.api.models import Collection
from langchain_chroma import Chroma
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain_core.embeddings import Embeddings
from langchain_ollama.llms import OllamaLLM

# from langchain_core.vectorstores.base import Collection
from langchain_community.document_loaders import PyPDFLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

from .utils import print_with_time, SuppressStdout
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import OllamaEmbeddings


DB_DIRECTORY = "db"
DOCUMENT_SOURCE_DIRECTORY = "rag-data"

CHUNK_SIZE = 1500
CHUNK_OVERLAP = 100
HIDE_SOURCE_DOCUMENTS = False

embeddingModel = OllamaEmbeddings(model="llama3.2")


class MyEmbeddingFunction(EmbeddingFunction):
    def __call__(self, input: Documents) -> Embeddings:
        return embeddingModel.embed_documents(input)


system_prompt = (
    "You are preparing training material for a multifamly residential management company"
    "Use the following pieces of retreived context to assemble the material"
    "Use the perspective of an apartment developer planning the ratio of low income tax credit to market rate units"
    "Answer any questions as concise as possible"
    "Use answers less than 200 words"
    "\n\n"
    "{context}"
)


def read_files(native_db):
    """This method loads the PDF files from the source directory
    and uses the explicit PyPDFLoader to ensure each PDF is broken
    down into individual pages for citation."""

    collection = get_collection(native_db)

    print_with_time("Loading PDF's")

    files = os.listdir(DOCUMENT_SOURCE_DIRECTORY)

    print(files, "\n")

    for file in files:
        if file.endswith(".pdf"):
            loader = PyPDFLoader(f"{DOCUMENT_SOURCE_DIRECTORY}/{file}")
            pages = loader.load()

            text_splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
            chunks = text_splitter.split_documents(pages)

            print(f"{file} - Pages: {len(pages)}")

            for index, chunk in enumerate(chunks):
                collection.upsert(
                    ids=[chunk.metadata.get("source") + str(index)],
                    metadatas=chunk.metadata,
                    documents=chunk.page_content,
                )


def get_collection(native_db) -> Collection:
    with SuppressStdout():
        print("DEBUG: call get_collection()")
        collection = None
        try:
            # Delete all documents
            native_db.delete_collection("PDFS")
        finally:
            collection: Collection = native_db.get_or_create_collection(
                "PDFS", embedding_function=MyEmbeddingFunction()
            )
            print(collection)
        return collection


def format_docs(docs):
    """A simple document formatter if the type of document was not chunked"""
    return "\n".join(doc.page_content for doc in docs)


def main():
    print("rag-chain main")
    llm = OllamaLLM(model="llama3.2")

    native_db = chromadb.PersistentClient("./data_store")

    read_files(native_db)

    db = Chroma(client=native_db, collection_name="PDFS", embedding_function=embeddingModel)

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{input}"),
        ]
    )

    # Initialize the primary chain outside the Q&A while loop.
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    retriever = db.as_retriever(
        search_type="mmr",
        search_kwargs={
            "k": 500,
            "lambda_mult": 0.25,
        },  # Get many documents back, we do 100 because we're dealing with PDFS
    )

    # Start the REPL
    while True:
        query = input("\nQuery: ")
        if query == "exit":
            break
        if query.strip() == "":
            continue

        rag_chain = create_retrieval_chain(retriever, question_answer_chain)

        # Call the QA chain to print the response
        resp = rag_chain.invoke({"input": query})

        # Here, we'll print the entire response object, but normally you would only deal with the
        # answer: resp["answer"]
        # print(resp)
        # print()
        print(resp["answer"])
