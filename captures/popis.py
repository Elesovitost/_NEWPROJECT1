import tkinter as tk
from tkinter import simpledialog, messagebox, colorchooser
from PIL import Image, ImageTk, ImageDraw, ImageFont
import os

class AnnotatorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Anotátor obrázků")
        
        self.base_out_name = simpledialog.askstring("Název výstupu", "Zadejte základní název pro nové soubory:", initialvalue="mednod_out")
        if not self.base_out_name:
            self.base_out_name = "mednod_out"

        self.idx = 1
        self.max_idx = 25
        self.texts = [] 
        self.is_saved = True
        
        self.top_frame = tk.Frame(root)
        self.top_frame.pack(fill=tk.X, pady=2)
        
        self.outline_frame = tk.Frame(root)
        self.outline_frame.pack(fill=tk.X, pady=2)
        
        self.info_label = tk.Label(self.top_frame, text="Načítání...", font=("Arial", 10, "bold"))
        self.info_label.pack(side=tk.LEFT, padx=10)
        
        self.font_name_var = tk.StringVar(value="arial.ttf")
        self.font_size_var = tk.IntVar(value=20)
        
        tk.Label(self.top_frame, text="Font:").pack(side=tk.LEFT, padx=(10, 0))
        font_entry = tk.Entry(self.top_frame, textvariable=self.font_name_var, width=15)
        font_entry.pack(side=tk.LEFT)
        font_entry.bind("<KeyRelease>", lambda e: self.redraw())
        
        tk.Label(self.top_frame, text="Velikost:").pack(side=tk.LEFT, padx=(10, 0))
        size_spin = tk.Spinbox(self.top_frame, from_=8, to=150, textvariable=self.font_size_var, width=5, command=self.redraw)
        size_spin.pack(side=tk.LEFT)
        size_spin.bind("<KeyRelease>", lambda e: self.redraw())
        
        tk.Button(self.top_frame, text="Uložit", command=self.save_image).pack(side=tk.RIGHT, padx=10)

        self.use_out1_var = tk.BooleanVar(value=True)
        self.color_out1_var = tk.StringVar(value="white")
        self.use_out2_var = tk.BooleanVar(value=False)
        self.color_out2_var = tk.StringVar(value="black")

        tk.Checkbutton(self.outline_frame, text="Outline 1", variable=self.use_out1_var, command=self.redraw).pack(side=tk.LEFT, padx=(10, 0))
        tk.Button(self.outline_frame, text="Barva O1", command=lambda: self.pick_color(self.color_out1_var)).pack(side=tk.LEFT)
        
        tk.Checkbutton(self.outline_frame, text="Outline 2", variable=self.use_out2_var, command=self.redraw).pack(side=tk.LEFT, padx=(20, 0))
        tk.Button(self.outline_frame, text="Barva O2", command=lambda: self.pick_color(self.color_out2_var)).pack(side=tk.LEFT)

        self.canvas = tk.Canvas(root, cursor="crosshair")
        self.canvas.pack(fill=tk.BOTH, expand=True)
        
        self.root.bind("<Up>", lambda e: self.handle_arrow_keys(-1))
        self.root.bind("<Down>", lambda e: self.handle_arrow_keys(1))
        
        self.canvas.bind("<Motion>", self.on_hover)
        self.canvas.bind("<Button-1>", self.on_click)
        self.canvas.bind("<B1-Motion>", self.on_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_release)
        self.canvas.bind("<Button-3>", self.on_right_click)
        self.canvas.bind("<Button-1>", self.focus_canvas, add="+")
        
        self.drag_data = {"item_idx": None, "x": 0, "y": 0}
        self.pil_img = None
        self.tk_img = None
        
        # Definice offsetů pro 1px široké vrstvy
        self.o1_offsets = [(-1,-1), (0,-1), (1,-1), (-1,0), (1,0), (-1,1), (0,1), (1,1)]
        self.o2_offsets = [(-2,-2), (-1,-2), (0,-2), (1,-2), (2,-2), 
                           (-2,-1), (2,-1), (-2,0), (2,0), (-2,1), (2,1), 
                           (-2,2), (-1,2), (0,2), (1,2), (2,2)]
        
        self.load_img()

    def pick_color(self, var):
        c = colorchooser.askcolor(initialcolor=var.get(), title="Vyberte barvu obrysu")[1]
        if c:
            var.set(c)
            self.redraw()

    def focus_canvas(self, event):
        self.canvas.focus_set()

    def handle_arrow_keys(self, step):
        widget = self.root.focus_get()
        if isinstance(widget, tk.Entry):
            return
        self.change_img(step)

    def get_font_size(self):
        try:
            return self.font_size_var.get()
        except tk.TclError:
            return 20

    def load_img(self):
        path = f"mednod-{self.idx:02d}.png"
        if not os.path.exists(path):
            self.canvas.delete("all")
            self.canvas.create_text(200, 200, text=f"Soubor {path} nenalezen.", fill="red")
            self.pil_img = None
            return

        self.pil_img = Image.open(path).convert("RGB")
        self.tk_img = ImageTk.PhotoImage(self.pil_img)
        self.canvas.config(width=self.pil_img.width, height=self.pil_img.height)
        self.redraw()

    def redraw(self):
        self.canvas.delete("all")
        if self.tk_img:
            self.canvas.create_image(0, 0, anchor=tk.NW, image=self.tk_img)
            
        fname = self.font_name_var.get().split('.')[0]
        if not fname: fname = "Arial"
        fsize = self.get_font_size()
        
        u_out1 = self.use_out1_var.get()
        c_out1 = self.color_out1_var.get()
        u_out2 = self.use_out2_var.get()
        c_out2 = self.color_out2_var.get()
            
        for i, t in enumerate(self.texts):
            x, y = t['x'], t['y']
            
            if u_out2:
                for dx, dy in self.o2_offsets:
                    self.canvas.create_text(
                        x+dx, y+dy, text=t['text'], fill=c_out2, 
                        font=(fname, fsize), tags=("text", f"idx_{i}")
                    )
            
            if u_out1:
                for dx, dy in self.o1_offsets:
                    self.canvas.create_text(
                        x+dx, y+dy, text=t['text'], fill=c_out1, 
                        font=(fname, fsize), tags=("text", f"idx_{i}")
                    )
            
            self.canvas.create_text(
                x, y, text=t['text'], fill=t['color'], 
                font=(fname, fsize), tags=("text", f"idx_{i}")
            )

    def on_hover(self, event):
        if not self.pil_img or event.x >= self.pil_img.width or event.y >= self.pil_img.height or event.x < 0 or event.y < 0: 
            return
        r, g, b = self.pil_img.getpixel((event.x, event.y))
        hex_c = f"#{r:02x}{g:02x}{b:02x}"
        status = " (Neuloženo)" if not self.is_saved else ""
        self.info_label.config(
            text=f"Obrázek {self.idx}/{self.max_idx}{status} | X:{event.x} Y:{event.y} | Barva: {hex_c}", 
            fg=hex_c, bg="black" if (r+g+b) > 380 else "white"
        )

    def on_click(self, event):
        item = self.canvas.find_withtag(tk.CURRENT)
        if item and "text" in self.canvas.gettags(item[0]):
            tags = self.canvas.gettags(item[0])
            idx_str = [t for t in tags if t.startswith("idx_")][0]
            self.drag_data = {"item_idx": int(idx_str.split("_")[1]), "x": event.x, "y": event.y}
            return

        if not self.pil_img: return
        if event.x >= self.pil_img.width or event.y >= self.pil_img.height or event.x < 0 or event.y < 0:
            return
            
        r, g, b = self.pil_img.getpixel((event.x, event.y))
        hex_c = f"#{r:02x}{g:02x}{b:02x}"
        txt = simpledialog.askstring("Nový text", "Zadejte text:")
        if txt:
            self.texts.append({'x': event.x, 'y': event.y, 'text': txt, 'color': hex_c, 'rgb': (r,g,b)})
            self.is_saved = False
            self.redraw()

    def on_drag(self, event):
        if self.drag_data["item_idx"] is not None:
            idx = self.drag_data["item_idx"]
            dx = event.x - self.drag_data["x"]
            dy = event.y - self.drag_data["y"]
            self.texts[idx]['x'] += dx
            self.texts[idx]['y'] += dy
            self.drag_data["x"], self.drag_data["y"] = event.x, event.y
            self.is_saved = False
            self.redraw()

    def on_release(self, event):
        self.drag_data["item_idx"] = None

    def on_right_click(self, event):
        item = self.canvas.find_withtag(tk.CURRENT)
        if item and "text" in self.canvas.gettags(item[0]):
            tags = self.canvas.gettags(item[0])
            idx = int([t for t in tags if t.startswith("idx_")][0].split("_")[1])
            self.texts.pop(idx)
            self.is_saved = False
            self.redraw()

    def change_img(self, step):
        if not self.is_saved and len(self.texts) > 0:
            resp = messagebox.askyesnocancel("Neuložené změny", "Tento obrázek není uložen. Chcete jej před přechodem uložit?")
            if resp is True:
                self.save_image()
            elif resp is None:
                return 

        self.idx = max(1, min(self.max_idx, self.idx + step))
        self.load_img()
        
        # Pokud neseme texty na nový obrázek, označíme jako neuložené
        if len(self.texts) > 0:
            self.is_saved = False
        else:
            self.is_saved = True

    def save_image(self):
        if not self.pil_img: return
        out_img = self.pil_img.copy()
        draw = ImageDraw.Draw(out_img)
        
        try:
            font = ImageFont.truetype(self.font_name_var.get(), self.get_font_size())
        except OSError:
            font = ImageFont.load_default() 

        u_out1 = self.use_out1_var.get()
        c_out1 = self.color_out1_var.get()
        u_out2 = self.use_out2_var.get()
        c_out2 = self.color_out2_var.get()

        for t in self.texts:
            x, y = t['x'], t['y']
            
            if u_out2:
                for dx, dy in self.o2_offsets:
                    draw.text((x+dx, y+dy), t['text'], fill=c_out2, font=font, anchor="mm")
            
            if u_out1:
                for dx, dy in self.o1_offsets:
                    draw.text((x+dx, y+dy), t['text'], fill=c_out1, font=font, anchor="mm")
            
            draw.text((x, y), t['text'], fill=t['rgb'], font=font, anchor="mm")
        
        os.makedirs("NEW", exist_ok=True)
        out_name = os.path.join("NEW", f"{self.base_out_name}-{self.idx:02d}.png")
        out_img.save(out_name)
        self.is_saved = True
        self.redraw() 

if __name__ == "__main__":
    root = tk.Tk()
    app = AnnotatorApp(root)
    root.mainloop()