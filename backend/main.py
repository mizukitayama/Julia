from fastapi import FastAPI
from pydantic import BaseModel
import io
from PIL import Image
from fastapi.responses import StreamingResponse

app = FastAPI()

from pydantic import BaseModel, validator

class Item(BaseModel):
    min_x: float
    max_x: float
    min_y: float
    max_y: float
    comp_const: complex

    class Config:
        arbitrary_types_allowed = True

    @validator('comp_const', pre=True, always=True)
    def parse_complex_string(cls, v):
        if isinstance(v, complex):
            return v
        if isinstance(v, str):
            try:
                return complex(v)
            except ValueError:
                raise ValueError("Invalid complex string")
        raise ValueError("Invalid data type for complex")

@app.post("/items")
async def update_item(item: Item):
    maxiterations = 100
    width = 640
    height = 360

    dx = (item.max_x - item.min_x) / width
    dy = (item.max_y - item.min_y) / height
    image = Image.new('RGB', (width, height))
    pixels = image.load()

    y = item.min_y
    for j in range(height):
        x = item.min_x
        for i in range(width):
            a = x
            b = y
            n = 0
            while n < maxiterations:
                aa = a * a
                bb = b * b
                if aa + bb > 4.0:
                    break
                twoab = 2.0 * a * b
                a = aa - bb + item.comp_const.real
                b = twoab + item.comp_const.imag
                n += 1

            if n == maxiterations:
                pixels[i, j] = (0, 0, 0)
            else:
                hue = 255 * (n / maxiterations)
                pixels[i, j] = (int(hue), 255, 150)

            x += dx
        y += dy

    byte_io = io.BytesIO()
    image.save(byte_io, 'PNG')
    byte_io.seek(0)
    return StreamingResponse(byte_io, media_type="image/png")
