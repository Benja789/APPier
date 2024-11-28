import { Text, TouchableOpacity, View } from "react-native";

// Estilos
import { BaseStyles } from "../../styles/BaseStyles";
import { ButtonStyle } from "../../styles/base/ButtonStyle";

interface IButtonProps {
    text?: string;
    callBack: () => void;
    textStyle?: object;
    buttonStyle?: object;
}
const Button = ( props: IButtonProps ) => {
    const { text, callBack, textStyle, buttonStyle } = props;
    return (
        <TouchableOpacity style={[ButtonStyle.button, buttonStyle ]} onPress={callBack} >
            <Text style={[ ButtonStyle.text, textStyle ]}>
                { text }
            </Text>
        </TouchableOpacity>
    )
}

export default Button;