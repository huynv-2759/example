from setuptools import setup, find_packages

setup(
    name="my_project",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "Django==3.2.5",
        "Flask>=2.0.1",
        "FastAPI",
        "tensorflow==2.5.0",
        "torch",
        "scikit-learn==0.24.2",
        "Keras>=2.4.3",
        "PyQt5==5.15.4",
        "Kivy",
        "djangorestframework==3.12.4",
        "flask-restful",
        "pygame==2.0.1",
        "tornado>=6.1",
        "sanic",
    ],
    extras_require={
        "dev": [
            "pytest>=6.2.4",
            "flake8",
            "black==21.6b0",
            "mypy",
        ],
    },
)
