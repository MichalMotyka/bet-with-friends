from dataclasses import dataclass

@dataclass(order=True,frozen=True)
class Response():
    message:str
    code:int
    time_stamp:float