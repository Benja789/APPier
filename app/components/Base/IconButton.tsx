import { Image, TouchableHighlight, TouchableOpacity } from "react-native"
import { IconButtonStyle } from "../../styles/base/IconButtonStyles";

interface IIconButtonProps {
    callBack: () => void;
    icon: any;
}
const IconButton = (props: IIconButtonProps) => {
    const { icon, callBack} = props;
    return (
        <TouchableHighlight 
            style={[IconButtonStyle.button]}
            underlayColor='rgba(0, 0, 0, 0.1)' // Color gris claro con opacidad
            onPress={callBack}>
            <Image
                style={IconButtonStyle.icon}
                source={icon}/>
        </TouchableHighlight>
    )
}

export default IconButton;