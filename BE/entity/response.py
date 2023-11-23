from dataclasses import dataclass

@dataclass(order=True,frozen=True)
class Response():
    message:str
    code:str
    time_stamp:float