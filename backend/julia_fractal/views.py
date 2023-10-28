from django.http import JsonResponse

def julia_set(request, min_x, max_x, min_y, max_y, comp_const_re, comp_const_im):
    min_x = float(min_x)
    max_x = float(max_x)
    min_y = float(min_y)
    max_y = float(max_y)
    comp_const_re = float(comp_const_re)
    comp_const_im = float(comp_const_im)
    constant = complex(float(comp_const_re), float(comp_const_im))
    width = 500
    height = 500
    max_iterations = 95

    def julia(z, i=0):
        z = z * z + constant
        if abs(z) > 2 or i == max_iterations:
            return i
        else:
            return julia(z, i+1)

    data = []
    for y in range(height):
        row = []
        for x in range(width):
            zx = (x / (width - 1)) * (max_x - min_x) + min_x
            zy = (y / (height - 1)) * (max_y - min_y) + min_y
            point = complex(zx, zy)
            iterations = julia(point)
            row.append(iterations)
        data.append(row)

    response = JsonResponse({"data": data})
    response["Access-Control-Allow-Origin"] = "*"
    return response
