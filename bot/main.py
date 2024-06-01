import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from typing import Union, Dict, Any
from aiogram import types
from aiogram.filters import Filter
from aiogram.types import Message
import keyboards

TOKEN = "7313590167:AAHZ65khzXNrZpBmxsUB2ulA-8PJ2CucNwM"
dp = Dispatcher()


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer(f"Для запуска нажми \"Start\"", reply_markup=keyboards.StartKeyBoards)

class WebAppDataFilter(Filter):
    async def __call__(self, message: Message, **kwargs) -> Union[bool, Dict[str, Any]]:
        return dict(web_app_data=message.web_app_data) if message.web_app_data else False


@dp.message(WebAppDataFilter())
async def handle_web_app_data(message: types.Message, web_app_data: types.WebAppData):
    print(web_app_data.data)
    await message.answer("Received web app data")
async def main() -> None:
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
