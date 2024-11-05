import datetime
import os
import sys


def current_time() -> str:
    """A helper function to format the current time"""
    now = datetime.datetime.now()
    return f"[{now.time()}]"


def print_with_time(value: str) -> None:
    """A helper function to show the current time on print statements"""
    print(f"{value} {current_time()}")


class SuppressStdout:
    """A simple class used for supressing stdout"""

    def __enter__(self):
        self._original_stdout = sys.stdout
        self._original_stderr = sys.stderr
        sys.stdout = open(os.devnull, "w")
        sys.stderr = open(os.devnull, "w")

    def __exit__(self, exc_type, exc_val, exc_tb):
        sys.stdout.close()
        sys.stdout = self._original_stdout
        sys.stderr = self._original_stderr
