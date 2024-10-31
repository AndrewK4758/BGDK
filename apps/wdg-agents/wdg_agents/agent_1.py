from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_ollama.llms import OllamaLLM
from langchain_core.messages import HumanMessage


prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You're an executive trainer looking to provide as factual information as possible"),
        MessagesPlaceholder(variable_name="messages"),
    ]
)


def main():

    model = OllamaLLM(model="llama3.2:latest")
    # codellama
    # sqlcoder
    # codestral
    # chain = prompt | model
    # resp = chain.invoke({"question":poetry she "What is the best practice for react contex ?"})
    while True:
        print("Query:", end=" ")
        try:
            line = input()
        except EOFError:
            break
        if line == "exit" or line == "quit":
            break
        chain = prompt | model
        resp = chain.invoke({"question": [HumanMessage(content=line)]})
        print(resp)
