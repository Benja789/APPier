import { Text, TouchableOpacity } from "react-native";
import { BaseStyles } from "../../styles/BaseStyles";

interface ILableButtonProps {
    textAnswer: string;
    textButton: string;
    callBack: () => void;
    styleAnswer?: object;
    styleButton?: object;
}

const LabelButton = ( props: ILableButtonProps ) => {
    const { textAnswer, textButton, callBack, styleAnswer, styleButton } = props;
    return (
        <Text style={[ BaseStyles.textP, styleAnswer ]}>
            { textAnswer}
            <TouchableOpacity onPress={callBack}>
                <Text style={[  BaseStyles.textButtonPressable, styleButton ]}>
                    { textButton }
                </Text>
            </TouchableOpacity>
        </Text>       
    )
}

export default LabelButton;