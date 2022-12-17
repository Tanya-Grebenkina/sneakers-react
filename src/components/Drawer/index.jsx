import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "..//hooks/useCart";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://6389e2aac5356b25a20b8d5b.mockapi.io/orders',
        {
          items: cartItems,
        }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          'https://6389e2aac5356b25a20b8d5b.mockapi.io/cart/' + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert('Помилка при створенні замовлення 😿');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className=" d-flex justify-between mb-30">
          Кошик
          <img
            onClick={onClose}
            className="cu-p"
            src="img/btn_remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imgUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price}грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn_remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Всього:</span>
                  <div></div>
                  <b>{totalPrice} грн.</b>
                </li>
                <li>
                  <span>Податок 18%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 18} грн.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформити замовлення <img src="img/arrow.svg" alt="Arrow" />{' '}
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Замовлення оформлене' : 'Кошик порожній'}
            description={
              isOrderComplete
                ? `Ваше замовлення #${orderId} незабаром буде передане кур'єрській доставці😌`
                : 'Додайте хоча б одну пару кросівок щоб зробити замовлення'
            }
            image={
              isOrderComplete
                ? 'img/complete-order.jpg'
                : 'img/empty-cart.jpg'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;

