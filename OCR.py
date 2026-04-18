import tkinter as tk
from PIL import ImageGrab
import pytesseract
import pyperclip

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

class SnippingTool:
    def __init__(self, root):
        self.root = root
        self.root.attributes('-alpha', 0.3) # Poloprůhlednost
        self.root.attributes('-fullscreen', True)
        self.root.config(cursor="cross")

        self.canvas = tk.Canvas(self.root, cursor="cross", bg="grey11")
        self.canvas.pack(fill="both", expand=True)

        self.canvas.bind("<ButtonPress-1>", self.on_button_press)
        self.canvas.bind("<B1-Motion>", self.on_move_press)
        self.canvas.bind("<ButtonRelease-1>", self.on_button_release)

        self.start_x = None
        self.start_y = None
        self.rect = None

    def on_button_press(self, event):
        self.start_x = event.x
        self.start_y = event.y
        self.rect = self.canvas.create_rectangle(self.start_x, self.start_y, 1, 1, outline='red', width=2)

    def on_move_press(self, event):
        self.canvas.coords(self.rect, self.start_x, self.start_y, event.x, event.y)

    def on_button_release(self, event):
        # Skrytí okna před pořízením snímku
        self.root.withdraw() 
        
        x1, y1 = min(self.start_x, event.x), min(self.start_y, event.y)
        x2, y2 = max(self.start_x, event.x), max(self.start_y, event.y)

        # Zachycení oblasti a OCR
        if x2 - x1 > 0 and y2 - y1 > 0:
            img = ImageGrab.grab(bbox=(x1, y1, x2, y2))
            text = pytesseract.image_to_string(img, lang='ces') # Čeština i angličtina
            pyperclip.copy(text.strip())

        self.root.destroy()

if __name__ == '__main__':
    root = tk.Tk()
    app = SnippingTool(root)
    root.mainloop()
