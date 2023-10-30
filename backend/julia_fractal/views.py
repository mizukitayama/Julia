from django.http import JsonResponse

def julia_set(request, min_x, max_x, min_y, max_y, comp_const):
    print(min_x, max_x, min_y, max_y, comp_const)
    try:
        min_x = float(min_x)
        max_x = float(max_x)
        min_y = float(min_y)
        max_y = float(max_y)
        constant = complex(comp_const)
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)

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

    response = JsonResponse({"data": data})
    response["Access-Control-Allow-Origin"] = "*"
    return response
