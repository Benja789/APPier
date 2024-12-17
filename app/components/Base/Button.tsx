import { Image, Text, TouchableOpacity, View } from "react-native";

// Estilos
import { ButtonStyle } from "../../styles/base/ButtonStyle";

interface IButtonProps {
    text?: string;
    callBack: () => void;
    textStyle?: object;
    disabled?: boolean;
    icon?: any;
    buttonStyle?: object;
}
const Button = ( props: IButtonProps ) => {
    const { text, callBack, textStyle, buttonStyle, disabled, icon } = props;
    return (
        <TouchableOpacity 
            style={[
                ButtonStyle.button, 
                buttonStyle,
                disabled === true ? ButtonStyle.disabled : {}
            ]} 
            disabled={disabled}
            onPress={callBack}>
            <View style={[ButtonStyle.textContainer]}>
                { 
                    icon && 
                    <Image source={ icon } style={ButtonStyle.icon} />
                }
                <Text style={[ ButtonStyle.text, textStyle ]}>
                    { text }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button;