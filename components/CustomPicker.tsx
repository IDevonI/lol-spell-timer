import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, FlatList, Pressable } from "react-native";

interface CustomPickerProps<T> {
    items: T[];
    selectedItem: T | null;
    onSelect: (item: T) => void;
    onDelete?: (key: string) => void;
    renderItemLabel: (item: T) => string;
    keyExtractor: (item: T, index: number) => string;
    placeholder?: string;
    onPressButton?: () => void;
}

const CustomPicker = <T,>(props: CustomPickerProps<T>) => {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [triggerLabel, setTriggerLabel] = useState<string>("");

    useEffect(() => {
        const triggerLabel = props.selectedItem
            ? props.renderItemLabel(props.selectedItem)
            : props.placeholder || "Select an item";
        setTriggerLabel(triggerLabel);
    }, [props.selectedItem, props.placeholder]);

    return (
        <>
            <Pressable className="absolute inset-0 z-8" onPress={() => setDropdownVisible(false)} />
            <View className="relative flex flex-column w-full">
                <View className={`flex-row items-center bg-leaguePanel w-full border-2 border-leagueGold ${dropdownVisible ? 'rounded-t-xl' : 'rounded-xl'}`}>
                    <TouchableOpacity
                        className="flex-1 p-3"
                        onPress={() => setDropdownVisible(true)}
                    >
                        <Text style={{ color: "white" }}>{triggerLabel}</Text>
                    </TouchableOpacity>
                    {props.onPressButton && (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={props.onPressButton}
                            className={`overflow-hidden border-l-2 border-leagueGold items-center justify-center ${dropdownVisible ? 'rounded-tr-xl' : 'rounded-r-xl'}`}
                        >
                            <LinearGradient
                                colors={["#1b1b1b", "#2b2b2b"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                className="w-12 h-14 items-center justify-center"
                            >
                                <FontAwesome6 name="plus" iconStyle="solid" color="#c8aa6e" size={18} />
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
                {dropdownVisible && (
                    <View className="absolute top-full z-10 w-full flex overflow-y-scroll bg-leaguePanel rounded-b-xl border-2 border-leagueGold p-3">
                        <FlatList
                            data={props.items.filter(value => props.keyExtractor(value, 0) !== (props.selectedItem ? props.keyExtractor(props.selectedItem, 0) : null))}
                            keyExtractor={props.keyExtractor}
                            renderItem={({ item, index }) => (
                                <View className={`flex-row items-center justify-between py-2 ${index && 'border-t border-leagueGold'}`}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.onSelect(item);
                                            setDropdownVisible(false);
                                        }}
                                    >
                                        <Text style={{ color: "white" }}>{props.renderItemLabel(item)}</Text>
                                    </TouchableOpacity>
                                    {props.onDelete && (
                                        <TouchableOpacity
                                            onPress={() => props.onDelete?.(props.keyExtractor(item, 0))}
                                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        >
                                            <FontAwesome6 name="xmark" size={16} color="#FF4444" iconStyle="solid" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                            ListEmptyComponent={<Text style={{ color: "white" }}>No items available</Text>}
                        />
                    </View>
                )}
            </View>
        </>
    )
};

export default CustomPicker;