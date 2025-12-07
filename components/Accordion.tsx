import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";


interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Accordion = (props: AccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const height = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration: 300 }),
    opacity: withTiming(expanded ? 1 : 0, { duration: 300 })
  }))

  const toggleExpand = () => {
    setExpanded(!expanded);
    height.value = expanded ? 0 : 330;
  }

  return (
    <SafeAreaView className={`overflow-hidden ${props.className ?? ""}`}>
      <TouchableOpacity onPress={toggleExpand}>
        <View className="flex items-center justify-center">
          <Text className="text-leagueGold text-lg" style={{ fontFamily: "Cinzel_700Bold" }}>
            {props.title}
          </Text>
          <Animated.View className="overflow-hidden" style={[animatedStyle, {marginBottom: expanded ? 6 : 0}]}>
            {props.children}
          </Animated.View>
          <FontAwesome6
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#c8aa6e"
            iconStyle="solid"
          />
        </View>
      </TouchableOpacity >


    </SafeAreaView >
  );
};

export default Accordion;