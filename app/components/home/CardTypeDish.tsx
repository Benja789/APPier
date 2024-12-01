import { Image, Text, TouchableHighlight, View } from "react-native"
import { BaseStyles } from "../../styles/BaseStyles"
import { CardTypeDishStyle } from "../../styles/components/CardTypeDishStyle"

interface ICardTypeDish {
    id: string
    name: string
    icon: any
    dishSelected: string
    callBack: (id: string) => void
}
const CardTypeDish = ( props: ICardTypeDish ) => {
    const { id, name, icon, dishSelected, callBack} = props

    return (
        <View style={[CardTypeDishStyle.card]} >
            <TouchableHighlight onPress={() => callBack(id)} underlayColor='rgba(0, 0, 0, 0.1)'>
                <View 
                    style={[
                        BaseStyles.cardContainer, BaseStyles.shadow, 
                        CardTypeDishStyle.contentCard, dishSelected === id ? CardTypeDishStyle.selected : null]}>
                    <Image style={CardTypeDishStyle.icon} source={ icon } />
                    <Text>{ name }</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

export default CardTypeDish