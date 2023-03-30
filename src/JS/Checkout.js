import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToProduct } from './store/product.thunk'
import { productAction } from './store/product.slice'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
    decrementHandler,
    incrementHandler,
}) => {
    const totalPrice = total.toFixed(2)
    const enebled = total === 0
    const disabled = availableCount === orderedQuantity
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${totalPrice}</td>
            <td>
                <button
                    className={styles.actionButton}
                    disabled={disabled}
                    onClick={() => incrementHandler(id, price)}
                >
                    +
                </button>
                <button
                    className={styles.actionButton}
                    disabled={enebled}
                    onClick={() => decrementHandler(id, price)}
                >
                    -
                </button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const dispatch = useDispatch()

    const { isLoading, error, products, totalPrice } = useSelector(
        (state) => state.products
    )

    useEffect(() => {
        dispatch(getToProduct())
    }, [])

    const incrementHandler = (id, price) => {
        dispatch(productAction.incrementPrice(price))
        dispatch(productAction.increment(id))
    }
    const decrementHandler = (id, price) => {
        dispatch(productAction.decrementPrice(price))
        dispatch(productAction.decrement(id))
    }

    console.log(products)
    let count = 0

    if (totalPrice > 1000) {
        count = totalPrice * 0.1
    }

    const prevCount = count.toFixed(2)
    const price = totalPrice.toFixed(2)

    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                {isLoading && !error && (
                    <>
                        <LoadingIcon />
                    </>
                )}
                {error && (
                    <h4 style={{ color: 'red' }}>Some thing went wrong</h4>
                )}

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th># Available</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => {
                            return (
                                <Product
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    orderedQuantity={item.quantity}
                                    total={item.total}
                                    availableCount={item.availableCount}
                                    incrementHandler={incrementHandler}
                                    decrementHandler={decrementHandler}
                                />
                            )
                        })}
                    </tbody>
                </table>
                <h2>Order summary</h2>
                <p>Discount: {prevCount}$ </p>
                <p>Total: {price} $ </p>
            </main>
        </div>
    )
}

export default Checkout
