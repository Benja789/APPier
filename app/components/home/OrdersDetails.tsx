import { ScrollView, Text, View } from "react-native"
import { OrderDetailsStyles } from "../../styles/components/OrderDetailsStyles"
import Button from "../Base/Button"
import { BaseStyles } from "../../styles/BaseStyles"
import DishAdded from "./DishAdded"
import { useContext } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"

const OrderDetails = () => {
    const appContext = useContext(AppContextProvider)

    return (
        <View style={ OrderDetailsStyles.container }>
            <Text style={[ BaseStyles.textTitleH1 ]}>Detalles de la orden</Text>
            <ScrollView>
                {
                    appContext.order?.products.map((dish, index) => (
                        <DishAdded 
                            key={index}
                            dish={dish}/>
                    ))
                }

                <View style={{ height: 290}}></View>
            </ScrollView>
            <View style={[ OrderDetailsStyles.buttonContainer ]}>
                <View style={BaseStyles.divider}/>
                <View style={[OrderDetailsStyles.informationDetails, { width:"100%"}]}>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Subtotal antes del desc.</Text>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>$ { appContext.formatedPrice(appContext.order?.subTotal ?? 0) }</Text>
                </View>

                <View style={[OrderDetailsStyles.informationDetails]}>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Descuento ({ appContext.formatedPrice(appContext.order?.discount ?? 0) }%)</Text>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails, OrderDetailsStyles.textDiscount ]}>$ { appContext.formatedPrice(appContext.order?.discountCash ?? 0) }</Text>
                </View>

                <View style={[OrderDetailsStyles.informationDetails]}>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Subtotal despues del desc.</Text>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>$ { appContext.formatedPrice(appContext.order?.subTotalWithDiscount ?? 0) }</Text>
                </View>            

                <View style={[OrderDetailsStyles.informationDetails]}>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Propina ({ appContext.formatedPrice(appContext.order?.tip ?? 0)}%)</Text>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>$ { appContext.formatedPrice(appContext.order?.tipCash ?? 0) }</Text>
                </View>

                <View style={[OrderDetailsStyles.separatorDotted]}/>
                <View style={[OrderDetailsStyles.informationDetails]}>
                    <Text style={[ BaseStyles.textTitleH3 ]}>Total</Text>
                    <Text style={[ BaseStyles.textTitleH3 ]}>$ { appContext.formatedPrice(appContext.order?.total ?? 0) }</Text>
                </View>
                <Button 
                    text="Guardar"
                    buttonStyle={OrderDetailsStyles.button}
                    callBack={()=>{}}/>
            </View>
        </View>
    )
}

export default OrderDetails