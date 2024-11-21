from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_ollama.llms import OllamaLLM
from langchain_core.messages import HumanMessage

prompt = ChatPromptTemplate.from_messages(
    [
        MessagesPlaceholder(variable_name="prompt"),
    ]
)


def main():

    model = OllamaLLM(model="gemma2:2b")
    # codellama
    # sqlcoder
    # codestral
    # chain = prompt | model
    # resp = chain.invoke({"question":poetry she "What is the best practice for react contex ?"})
    while True:
        print("Query:", end=" ")
        try:
            inputText = input()
        except EOFError:
            break
        if inputText == "exit" or inputText == "quit":
            break
        chain = prompt | model
        resp = chain.invoke({"prompt": [HumanMessage(content=inputText)]})
        print(resp)


if __name__ == "__main__":
    main()
