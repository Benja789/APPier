import { Text, View } from "react-native"
import { BaseStyles } from "../../styles/BaseStyles"
import Button from "../Base/Button"
import { DishAddedStyles } from "../../styles/components/DishAddedStyles"
import IconButton from "../Base/IconButton"
import { useContext } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"

interface IDishAddedProps {
    dish: any
}

const DishAdded = ( props: IDishAddedProps ) => {
    const { dish } = props
    const appContext = useContext(AppContextProvider)


    // Metodo para eliminar un producto de la orden
    const deleteDish = () => {
        appContext.deleteDish(dish)
    }

    // Metodo para cambiar las cantidades de los platos
    const changeQuantity = (type: '-' | '+') => {
        appContext.changeQuantity(dish, type)
    }

    // Metodo para obtener el label del order
    const getLabel = () => {
        let label = dish.name ?? ""
        if ( dish.type ) {
            if ( dish.type === 'entrance' ) label += " (Entrada)" 
            if ( dish.type === 'dish' ) label += " (Plato fuerte)" 
            if ( dish.type === 'dessert' ) label += " (Postre)" 
        }
        return label
    }


    return (
        <View style={ DishAddedStyles.cardDish}>
            <View style={[ DishAddedStyles.containerButton ]}>
                <View style={{ width:"85%"}}>
                    <Text style={[BaseStyles.textTitleH3, { fontSize: 13 }]}>{ getLabel() }</Text>
                    <Text style={[BaseStyles.textP, { fontSize: 12 }]}>{ dish.description ?? "" }</Text>
                    <Text style={[BaseStyles.textP, { fontSize: 12 }]}>${ appContext.formatedPrice(dish.price ?? 0) ?? "" }</Text>
                    <Text style={[BaseStyles.textTitleH1, { fontSize: 12 }]}>${ appContext.formatedPrice(dish.totalLine ?? 0) ?? "" }</Text>
                </View>
                {
                    dish.status !== "delivered" &&
                        <IconButton
                            icon={require("../../assets/icons/delete.png")}
                            callBack={()=> deleteDish()}/>
                }
            </View>
            <View style={[ DishAddedStyles.containerButton ]}>
                {
                    dish.canEdit ?
                        <Button 
                            text="-"
                            buttonStyle={{ width: 80 }}
                            callBack={()=> changeQuantity('-') }/>
                        :
                        <View style={{ width: 80 }}/>
                }
                <Text style={[BaseStyles.textP, { fontSize: 12 }]}>{ dish.quantity ?? 0 }</Text>
                {
                    dish.canEdit ?
                        <Button 
                            text="+"
                            buttonStyle={{ width: 80 }}
                            callBack={()=> changeQuantity('+') }/>
                        :
                        <View style={{ width: 80 }}/>
                }

            </View>
        </View>
    )
}

export default DishAdded