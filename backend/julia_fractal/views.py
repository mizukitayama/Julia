from django.http import JsonResponse
import re, math

def julia_set(request, min_x, max_x, min_y, max_y, comp_const):
    try:
        min_x = float(min_x)
        max_x = float(max_x)
        min_y = float(min_y)
        max_y = float(max_y)

        if any(math.isnan(val) for val in [min_x, max_x, min_y, max_y]):
            response = JsonResponse({"error": "実数部最小値、実数部最大値、虚数部最小値、虚数部最大値を数字で入力してください。"}, status=400)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        if not re.match(r'^[-\d.]+[+-]\d*\.?\d*j$', comp_const):
            response = JsonResponse({"error": "複素定数のフォーマットが不適切です。正しいフォーマットで入力してください。（虚数単位はjで入力）"}, status=400)
            response["Access-Control-Allow-Origin"] = "*"
            return response
        constant = complex(comp_const)
    except ValueError as e:
        response = JsonResponse({"error": "実数部最小値min_x、実数部最大値max_x、虚数部最小値min_y、虚数部最大値max_yは数字で入力してください。"}, status=400)
        response["Access-Control-Allow-Origin"] = "*"
        return response

    if min_x >= max_x:
        response = JsonResponse({"error": "実数部最小値min_xは実数部最大値max_xよりも小さい値を入力してください."}, status=400)
        response["Access-Control-Allow-Origin"] = "*"
        return response
    if min_y >= max_y:
        response = JsonResponse({"error": "虚数部最小値min_yは虚数部最大値max_yよりも小さい値を入力してください。"}, status=400)
        response["Access-Control-Allow-Origin"] = "*"
        return response
    width = 500
    height = 500
    max_iterations = 95

    def julia(z):
        for i in range(max_iterations):
            z = z * z + constant
            if abs(z) > 2:
                return i
        return max_iterations

    data = []
    for y in range(height):
        row = []
        for x in range(width):
            zx = (1 - x / (width - 1)) * (max_x - min_x) + min_x # 左右反転
            zy = (y / (height - 1)) * (max_y - min_y) + min_y
            point = complex(zx, zy)
            iterations = julia(point)
            row.append(iterations)
        data.append(row)

    response = JsonResponse({"data": data, "request": {"min_x": min_x, "max_x": max_x, "min_y": min_y, "max_y": max_y, "comp_const": comp_const}})
    response["Access-Control-Allow-Origin"] = "*"
    return response
