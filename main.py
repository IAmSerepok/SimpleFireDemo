from py5 import Sketch
import numpy as np


class App(Sketch):
    """Класс, представляющий простое приложение на py5.

    Attributes:
        tile_size (List): Размеры одной клетки в пикселях.
        dimensions (np.ndarray): Размеры поля в клетках. 
        field (np.ndarray): Поле температур.
        palette (np.ndarray): Цветовая палитра.
    """
    
    def __init__(self, width: int, height: int) -> None:
        """Инициализирует объект приложения py5
        
        Args:
            width (int): Ширина окна в пикселях.
            height (int): Высота окна в пикселях.
        """
        super().__init__()
        
        self.tile_size = 10, 18
        self.dimensions = np.array([width, height])

        self.field = np.zeros((width, height), dtype=np.int16)

        self.palette = np.array([
            (  0,  0,   0), (  0,   4,  4), (  0,  16, 20), (  0,  28,  36),
            (  0,  32, 44), (  0,  36, 48), ( 60,  24, 32), (100,  16,  16),
            (132,  12, 12), (160,   8,  8), (192,   8,  8), (220,   4,   4),
            (252,   0,  0), (252,   0,  0), (252,  12,  0), (252,  28,   0),
            (252,  40,  0), (252,  52,  0), (252,  64,  0), (252,  80,   0),
            (252,  92,  0), (252, 104,  0), (252, 116,  0), (252, 132,   0),
            (252, 144,  0), (252, 156,  0), (252, 156,  0), (252, 160,   0),
            (252, 160,  0), (252, 164,  0), (252, 168,  0), (252, 168,   0),
            (252, 172,  0), (252, 176,  0), (252, 176,  0), (252, 180,   0),
            (252, 180,  0), (252, 184,  0), (252, 188,  0), (252, 188,   0),
            (252, 192,  0), (252, 196,  0), (252, 196,  0), (252, 200,   0),
            (252, 204,  0), (252, 204,  0), (252, 208,  0), (252, 212,   0),
            (252, 212,  0), (252, 216,  0), (252, 220,  0), (252, 220,   0),
            (252, 224,  0), (252, 228,  0), (252, 228,  0), (252, 232,   0),
            (252, 232,  0), (252, 236,  0), (252, 240,  0), (252, 240,   0),
            (252, 244,  0), (252, 248,  0), (252, 248,  0), (252, 252,   0)
        ] + 192 * [(255, 255, 255)])

    def settings(self) -> None:
        """Устанавливает размер окна"""
        self.size(*(self.dimensions * self.tile_size))

    def setup(self) -> None:
        """Устанавливает параметры py5"""
        self.rect_mode(self.CORNERS)
        self.no_stroke()
        self.background('#000000')

    def render(self):
        """Отображает поле""" 
        w, h = self.dimensions
        dw, dh = self.tile_size
        for x in range(w):
            for y in range(h):
                self.fill(*self.palette[self.field[x, y]])
                self.rect(x * dw, y * dh, (x + 1) * dw, (y + 1) * dh)

    def generate_flames(self):
        w, h = self.dimensions
        x, y = np.random.randint(0, w), np.random.randint(0, h)
        self.field[x, y] = 255

    def vertical_blur(self):
        ...

    def horisontal_blur(self):
        ...

    def draw(self) -> None:
        """Совершает один шаг по времени"""
        self.render()
        self.generate_flames()
        self.vertical_blur()
        self.horisontal_blur()


if __name__ == '__main__':
    app = App(width=80, height=25)
    app.run_sketch()
