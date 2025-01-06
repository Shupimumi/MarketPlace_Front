import axiosInstance from "../api/axiosInstance";
import apiUrls from "../config/apiUrls";

// Получение всех товаров
export const fetchGoods = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.GOODS);
        return response.data;
    } catch (error) {
        console.error('Error fetching goods:', error);
        throw error;
    }
}

// TODO Создание нового товара