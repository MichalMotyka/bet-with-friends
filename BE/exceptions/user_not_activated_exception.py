class UserNotActivatedException(Exception):
    def __init__(self, message="User is not activated", code="L2"):
        self.message = message
        self.code = code
        super().__init__(self.message)