import argparse
import logging

from wdg_agents.rag_chain import main as PDFS
from wdg_agents.rag_chain import main as Agent

FORMAT = "[%(asctime)s] (%(filename)s . %(funcName)s :: %(lineno)d) -- %(message)s"

def main():
    print('cli main')
    logging.basicConfig(filename="lc-e2e.log", level=logging.INFO, format=FORMAT)

    parser = argparse.ArgumentParser(
        prog="cli",
        description="A simple CLI for demonstrating gemini using langchain",
        epilog="\nGoogle Cloud Platform",
    )

    subparsers = parser.add_subparsers(dest="action", help="Command Help")
    subparsers.add_parser(name="agent", help="Runs a simple Q&A bot with a sarcastic twist.")
    subparsers.add_parser(name="books", help="Runs a RAG model against the book data.")

    print(subparsers, '\n')
    # print(agent, '\n',books,'\n')

    args = parser.parse_args()

    print(args)

    match args.action:
        case "agent":
            print('agent')
            Agent()
        case "books":
            print('pdfs')
            PDFS()
