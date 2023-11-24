class PasswordOrLoginIncorrectException(Exception):
    def __init__(self, message="Password or Login isn't correct", code="L1"):
        self.code = code
        self.message = message
        super().__init__(self.message)