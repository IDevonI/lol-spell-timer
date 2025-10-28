import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Modal, FlatList } from "react-native";

interface CustomPickerProps<T> {
    items: T[];
    selectedItem: T | null;
    onSelect: (item: T) => void;
    onDelete?: (key: string) => void;
    renderItemLabel: (item: T) => string;
    keyExtractor: (item: T, index: number) => string;
    navigation?: any;
    placeholder?: string;
    onPressButton?: () => void;
}

const CustomPicker = <T,>(props: CustomPickerProps<T>) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [triggerLabel, setTriggerLabel] = useState<string>("");

    useEffect(() => {
        const triggerLabel = props.selectedItem
            ? props.renderItemLabel(props.selectedItem)
            : props.placeholder || "Select an item";
        setTriggerLabel(triggerLabel);
    }, [])

    return (
        <View className="flex-row items-center bg-leaguePanel rounded-xl mb-8 w-full">
            <TouchableOpacity
                className="flex-1 p-3"
                onPress={() => setModalVisible(true)}
            >
                <Text style={{ color: "white" }}>{triggerLabel}</Text>
            </TouchableOpacity>
            {props.onPressButton && (
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={props.onPressButton}
                    className="overflow-hidden border-2 border-leagueGold items-center justify-center rounded-r-xl"
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-leaguePanel rounded-xl p-4 w-4/5">
                        <FlatList
                            data={props.items}
                            keyExtractor={props.keyExtractor}
                            renderItem={({ item }) => (
                                <View className="flex-row items-center justify-between py-2">
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.onSelect(item);
                                            setModalVisible(false);
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
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="mt-4 p-2 bg-red-500 rounded"
                        >
                            <Text className="text-white text-center">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

export default CustomPicker;