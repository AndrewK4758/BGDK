import argparse
import logging

from wdg_agents.rag_chain import main as PDFS
from wdg_agents.agent_1 import main as Agent

FORMAT = "[%(asctime)s] (%(filename)s . %(funcName)s :: %(lineno)d) -- %(message)s"


def main():

    logging.basicConfig(filename="lc-e2e.log", level=logging.INFO, format=FORMAT)

    parser = argparse.ArgumentParser(
        prog="cli",
        description="A simple CLI to demonstrate running agents using langchain",
    )

    subparsers = parser.add_subparsers(dest="action", required=False)

    subparsers.add_parser("agent", help="Runs a simple Q&A bot with a sarcastic twist.")
    subparsers.add_parser("PDFS", help="Runs a RAG model against the book data.")

    args = parser.parse_args()

    match args.action:
        case "agent":
            Agent()
        case "PDFS":
            PDFS()


# if __name__ == "__main__":
#     main()
