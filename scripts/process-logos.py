from PIL import Image
import os

def remove_background(image_path, target_color, tolerance=30):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is close to target_color
            if (abs(item[0] - target_color[0]) < tolerance and
                abs(item[1] - target_color[1]) < tolerance and
                abs(item[2] - target_color[2]) < tolerance):
                newData.append((255, 255, 255, 0)) # Make Transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(image_path, "PNG")
        print(f"Processed: {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

# Paths
base_dir = "public/static/images"
light_logo_path = os.path.join(base_dir, "logo-light.png")
dark_logo_path = os.path.join(base_dir, "logo-dark.png")

# Process Light Logo (Remove White Background)
# White is (255, 255, 255)
remove_background(light_logo_path, (255, 255, 255), tolerance=100)

# Process Dark Logo (Remove Black Background)
# Black is (0, 0, 0)
remove_background(dark_logo_path, (0, 0, 0), tolerance=100)
