import { Image, Text, TouchableOpacity, View } from "react-native"
import { BaseStyles } from "../../styles/BaseStyles"
import Button from "../Base/Button"
import { ListDishesStyles } from "../../styles/pages/ListDishesStyles"
import { useContext } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"

interface IPropsDischCard { 
    dish: any
    callBack: () => void
    callBackDetails: () => void
}
const DishCard = ( props: IPropsDischCard ) => {
    const { dish, callBack, callBackDetails} = props
    const appContext = useContext(AppContextProvider)

    return (
        <View style={[BaseStyles.cardContainer, BaseStyles.shadow, ListDishesStyles.baseCard]}>
            <View style={[BaseStyles.cardContent, ListDishesStyles.cardDishContainer]}>
                <TouchableOpacity onPress={callBackDetails}>
                    {
                        (dish.image !== null && dish.image !== undefined && dish.image !== "") ?
                            <Image source={{
                                uri: dish.image
                            }} style={{ width: 130, height: 130, borderRadius: 10 }} />
                            :
                            <Image source={require("../../assets/icons/restaurant.png")} style={{ width: 100, height: 100 }} />
                    }
                </TouchableOpacity>
                        <View style={{ height:60, marginTop: 10, alignItems:'center', flexDirection: 'column', justifyContent:'center' }}>
                    <Text style={[ BaseStyles.textTitleH3, { fontSize: 13, textAlign: 'center' } ]}> { dish.name ?? "" } </Text>
                </View>
                <Text style={[ BaseStyles.textTitleH3, { fontSize: 13, textAlign: 'center' } ]}>$ { appContext.formatedPrice(dish.price ?? 0) ?? "" }</Text>
                <Button 
                    text="Agregar" 
                    buttonStyle={{ 
                        width: "80%"
                    }}
                    callBack={callBack}/>
            </View>
        </View>
    )
}
export default DishCard