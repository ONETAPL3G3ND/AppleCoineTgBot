from aiogram.utils.keyboard import ReplyKeyboardMarkup, KeyboardButton
from aiogram.utils.keyboard import WebAppInfo


StartKey = KeyboardButton(text="Start", web_app=WebAppInfo(url="https://521a-178-14-202-125.ngrok-free.app"))
StartKeyBoards = ReplyKeyboardMarkup(keyboard=[[StartKey]], resize_keyboard=True)
