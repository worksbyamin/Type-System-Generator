import re

with open('src/components/Workspace/SpecimenView.tsx', 'r') as f:
    content = f.read()

content = content.replace("h1: 'Fluid & Modern Web Typography',", "display: 'Extraordinary Typographic Presence',\n  h1: 'Fluid & Modern Web Typography',")
content = content.replace("small: 'Note: This is a small caption line for testing typography scale hierarchy and footnote legibility.'\n};", "small: 'Note: This is a small caption line for testing typography scale hierarchy and footnote legibility.',\n  xsmall: 'DISCLAIMER: This extra small legal text is used for copyright notices and minor details.'\n};")

content = content.replace("h1: 'تایپوگرافی زیبا و مدرن وب',", "display: 'حضور خارق‌العاده تایپوگرافی',\n  h1: 'تایپوگرافی زیبا و مدرن وب',")
content = content.replace("small: 'توجه: این یک خط توضیح کوچک برای آزمایش سلسله مراتب مقیاس تایپوگرافی و خوانایی پاورقی است.'\n};", "small: 'توجه: این یک خط توضیح کوچک برای آزمایش سلسله مراتب مقیاس تایپوگرافی و خوانایی پاورقی است.',\n  xsmall: 'سلب مسئولیت: این متن حقوقی بسیار کوچک برای اعلامیه‌های کپی‌رایت و جزئیات جزئی استفاده می‌شود.'\n};")

with open('src/components/Workspace/SpecimenView.tsx', 'w') as f:
    f.write(content)
