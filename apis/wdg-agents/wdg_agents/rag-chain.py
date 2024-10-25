import os

import chromadb
from chromadb import EmbeddingFunction, Documents

from chromadb.api.models.Collection import Collection
from langchain_chroma import Chroma
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.embeddings import Embeddings
from langchain_ollama.llms import OllamaLLM
from langchain_core.vectorstores.base import Collection
from langchain_community.document_loaders import PyPDFLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

from .utils import print_with_time, SuppressStdout
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import OllamaEmbeddings


DB_DIRECTORY = 'db'
DOCUMENT_SOURCE_DIRECTORY = 'rag-data'

CHUNK_SIZE=2000
CHUNK_OVERLAP=400
HIDE_SOURCE_DOCUMENTS=False

embeddingModel = OllamaEmbeddings(model='llama3.2')

class MyEmbeddingFunction(EmbeddingFunction):
  def __call__(self, input: Documents) -> Embeddings:
    return embeddingModel.embed_documents(input)



