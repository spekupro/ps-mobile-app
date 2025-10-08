import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '@/src/components/CustomButton';
import icons from '@/src/common/constants/icons';

interface FilterOption {
    name: string;
    type: 'list' | 'dateRange';
    options?: string[];
}

interface SelectedFilters {
    [key: string]: string[] | { startDate?: Date; endDate?: Date };
}

interface FiltersModalProps {
    visible: boolean;
    filters: FilterOption[];
    onClose: () => void;
    onApply: (selectedFilters: SelectedFilters) => void;
}

// TODO Date filters have timezone issue, if you send 10.10.2025 at 00:05 EET, it will convert it to 09.10.2025 21:05 UTC
//  and and correct orders are not found

const FiltersModal: React.FC<FiltersModalProps> = ({ visible, filters, onClose, onApply }) => {
    const insets = useSafeAreaInsets();
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set());

    const toggleFilterOption = (filterName: string, option: string) => {
        setSelectedFilters(prev => {
            const currentOptions = (prev[filterName] as string[]) || [];
            const isSelected = currentOptions.includes(option);

            if (isSelected) {
                return {
                    ...prev,
                    [filterName]: currentOptions.filter(o => o !== option),
                };
            } else {
                return {
                    ...prev,
                    [filterName]: [...currentOptions, option],
                };
            }
        });
    };

    const isOptionSelected = (filterName: string, option: string) => {
        const filterValue = selectedFilters[filterName];
        return Array.isArray(filterValue) && filterValue.includes(option);
    };

    const handleDateChange = (filterName: string, type: 'startDate' | 'endDate', date?: Date) => {
        if (date) {
            setSelectedFilters(prev => {
                const currentDateRange = (prev[filterName] as { startDate?: Date; endDate?: Date }) || {};
                return {
                    ...prev,
                    [filterName]: {
                        ...currentDateRange,
                        [type]: date,
                    },
                };
            });
        }
    };

    const clearDate = (filterName: string, type: 'startDate' | 'endDate') => {
        setSelectedFilters(prev => {
            const currentDateRange = (prev[filterName] as { startDate?: Date; endDate?: Date }) || {};
            const newDateRange = { ...currentDateRange };
            delete newDateRange[type];

            // If both dates are now empty, remove the filter entirely
            if (!newDateRange.startDate && !newDateRange.endDate) {
                const { [filterName]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [filterName]: newDateRange,
            };
        });
        closeDatePickers();
    };

    const toggleStartDatePicker = () => {
        setShowEndDatePicker(false);
        setShowStartDatePicker(prev => !prev);
    };

    const toggleEndDatePicker = () => {
        setShowStartDatePicker(false);
        setShowEndDatePicker(prev => !prev);
    };

    const closeDatePickers = () => {
        setShowStartDatePicker(false);
        setShowEndDatePicker(false);
    };

    const getDateRangeValue = (filterName: string) => {
        const value = selectedFilters[filterName];
        return (value && !Array.isArray(value)) ? value : { startDate: undefined, endDate: undefined };
    };

    const formatDate = (date?: Date) => {
        if (!date) return 'Select date';
        return date.toLocaleDateString();
    };

    const handleApply = () => {
        onApply(selectedFilters);
        onClose();
    };

    const toggleFilterExpanded = (filterName: string) => {
        setExpandedFilters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(filterName)) {
                newSet.delete(filterName);
            } else {
                newSet.add(filterName);
            }
            return newSet;
        });
    };

    const handleClear = () => {
        closeDatePickers();
        setSelectedFilters({});
    };

    const listFilters = filters.filter(f => f.type === 'list');
    const dateRangeFilters = filters.filter(f => f.type === 'dateRange');

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
            statusBarTranslucent={false}
        >
            <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
                <View className="p-6 border-b border-neutral-20">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-2xl font-bold color-neutral-60">Filters</Text>
                        <TouchableOpacity onPress={onClose} className="py-2 px-5">
                            <Image source={icons.CloseIcon} className="w-6 h-6" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView className="flex-1 p-6">
                    {dateRangeFilters.map(filter => {
                        const dateRange = getDateRangeValue(filter.name);
                        return (
                            <View key={filter.name} className="mb-6">
                                <Text className="text-lg font-semibold color-neutral-60 mb-3 capitalize">
                                    {filter.name.replace(/([A-Z])/g, ' $1').trim()}
                                </Text>

                                <View className="flex-row gap-3 mb-4">
                                    <View className="flex-1">
                                        <Text className="text-sm color-neutral-60 mb-2">Start Date</Text>
                                        <View className="flex-row items-center gap-2">
                                            <TouchableOpacity
                                                onPress={toggleStartDatePicker}
                                                className="flex-1 py-3 px-4 border-2 border-neutral-30 rounded-lg"
                                            >
                                                <Text className="text-base color-neutral-60">
                                                    {formatDate(dateRange.startDate)}
                                                </Text>
                                            </TouchableOpacity>
                                            {dateRange.startDate && (
                                                <TouchableOpacity
                                                    onPress={() => clearDate(filter.name, 'startDate')}
                                                >
                                                    <Image source={icons.CloseIcon} className="w-5 h-5" />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-sm color-neutral-60 mb-2">End Date</Text>
                                        <View className="flex-row items-center gap-2">
                                            <TouchableOpacity
                                                onPress={toggleEndDatePicker}
                                                className="flex-1 py-3 px-4 border-2 border-neutral-30 rounded-lg"
                                            >
                                                <Text className="text-base color-neutral-60">
                                                    {formatDate(dateRange.endDate)}
                                                </Text>
                                            </TouchableOpacity>
                                            {dateRange.endDate && (
                                                <TouchableOpacity
                                                    onPress={() => clearDate(filter.name, 'endDate')}
                                                >
                                                    <Image source={icons.CloseIcon} className="w-5 h-5" />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                </View>

                                {(showStartDatePicker || showEndDatePicker) && (
                                    <View className="items-center mb-4">
                                        <DateTimePicker
                                            value={showStartDatePicker ? (dateRange.startDate || new Date()) : (dateRange.endDate || new Date())}
                                            mode="date"
                                            display="inline"
                                            onChange={(_event, date) => {
                                                handleDateChange(filter.name, showStartDatePicker ? 'startDate' : 'endDate', date);
                                                closeDatePickers();
                                            }}
                                            minimumDate={showEndDatePicker ? dateRange.startDate : undefined}
                                            accentColor="#5C14EB"
                                        />
                                    </View>
                                )}
                            </View>
                        );
                    })}

                    {listFilters.map(filter => {
                        const isExpanded = expandedFilters.has(filter.name);
                        const selectedCount = Array.isArray(selectedFilters[filter.name])
                            ? (selectedFilters[filter.name] as string[]).length
                            : 0;

                        return (
                            <View key={filter.name} className="mb-4">
                                <TouchableOpacity
                                    onPress={() => toggleFilterExpanded(filter.name)}
                                    className="flex-row items-center justify-between py-3 px-4 border-2 border-neutral-30 rounded-lg"
                                >
                                    <Text className="text-lg font-semibold color-neutral-60 capitalize">
                                        {filter.name.replace(/([A-Z])/g, ' $1').trim()}
                                        {selectedCount > 0 && (
                                            <Text className="text-sm color-primary-50"> ({selectedCount})</Text>
                                        )}
                                    </Text>
                                    <Text className="text-xl color-neutral-60">{isExpanded ? '−' : '+'}</Text>
                                </TouchableOpacity>

                                {isExpanded && (
                                    <View className="mt-2 space-y-2">
                                        {filter.options?.map(option => (
                                            <TouchableOpacity
                                                key={option}
                                                onPress={() => toggleFilterOption(filter.name, option)}
                                                className="flex-row items-center py-3 px-4 border border-neutral-20 rounded-lg"
                                            >
                                                <View
                                                    className={`w-5 h-5 border-2 rounded mr-3 items-center justify-center ${
                                                        isOptionSelected(filter.name, option)
                                                            ? 'bg-primary-50 border-primary-50'
                                                            : 'border-neutral-30'
                                                    }`}
                                                >
                                                    {isOptionSelected(filter.name, option) && (
                                                        <Text className="text-white text-xs">✓</Text>
                                                    )}
                                                </View>
                                                <Text className="text-base color-neutral-60 capitalize">
                                                    {option.replace(/_/g, ' ').toLowerCase()}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>

                <View className="p-6 border-t border-neutral-20">
                    <View className="flex-row gap-3">
                        <View className="flex-1">
                            <CustomButton
                                title="Clear"
                                handlePress={handleClear}
                                containerStyles="border-2 border-neutral-30"
                                textStyles="color-neutral-60"
                            />
                        </View>
                        <View className="flex-1">
                            <CustomButton
                                title="Apply"
                                handlePress={handleApply}
                                containerStyles="bg-primary-50"
                                textStyles="text-white"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FiltersModal;
