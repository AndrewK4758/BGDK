"""Hello unit test module."""

from wdg_agents.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello wdg-agents"
