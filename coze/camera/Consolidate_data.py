from runtime import Args
from typings.Consolidate_data.Consolidate_data import Input, Output


def handler(args: Args[Input]) -> Output:
    input = args.input

    device_id = input.device_id
    total = int(input.total)  # 将字符串转换为整数

    # 创建输出数据的字典结构
    output_data = {
        "data": [
            {
                "device_id": device_id,
                "total": total
            }
        ]
    }

    return output_data