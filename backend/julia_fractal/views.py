from django.http import JsonResponse
import re, math

def create_error_response(message, status=400):
    response = JsonResponse({"error": message}, status=status)
    response["Access-Control-Allow-Origin"] = "*"
    return response

def validate_input(min_x, max_x, min_y, max_y, comp_const):
    if any(math.isnan(val) for val in [min_x, max_x, min_y, max_y]):
        return "実数部最小値、実数部最大値、虚数部最小値、虚数部最大値を数字で入力してください。"
    
    if not re.match(r'^[-\d.]+[+-]\d*\.?\d*j$', comp_const):
        return "複素定数のフォーマットが不適切です。正しいフォーマットで入力してください。（虚数単位はjで入力）"
    
    if min_x >= max_x or min_y >= max_y:
        return "実数部最小値min_xは実数部最大値max_xよりも小さい値、または、虚数部最小値min_yは虚数部最大値max_yよりも小さい値を入力してください。"

    return None  # No error

def calculate_julia_set(width, height, min_x, max_x, min_y, max_y, comp_const):
    max_iterations = 95
    constant = complex(comp_const)
    
    def julia(z):
        for i in range(max_iterations):
            z = z * z + constant
            if abs(z) > 2:
                return i
        return max_iterations
    
    data = [
        [
            julia(complex((1 - x / (width - 1)) * (max_x - min_x) + min_x,
                          (y / (height - 1)) * (max_y - min_y) + min_y))
            for x in range(width)
        ]
        for y in range(height)
    ]
    
    return data

def julia_set(request, min_x, max_x, min_y, max_y, comp_const):
    try:
        min_x, max_x, min_y, max_y = map(float, [min_x, max_x, min_y, max_y])
    except ValueError:
        return create_error_response("入力された値は数値である必要があります。")
    
    error_message = validate_input(min_x, max_x, min_y, max_y, comp_const)
    if error_message:
        return create_error_response(error_message)

    data = calculate_julia_set(500, 500, min_x, max_x, min_y, max_y, comp_const)
    
    response = JsonResponse({
        "data": data,
        "request": {
            "min_x": min_x,
            "max_x": max_x,
            "min_y": min_y,
            "max_y": max_y,
            "comp_const": comp_const
        }
    })
    response["Access-Control-Allow-Origin"] = "*"
    return response
