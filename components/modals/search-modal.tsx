import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  Keyboard,
} from 'react-native';
import { X, Search as SearchIcon } from 'lucide-react-native';
import { useSearch } from '@/SearchContext';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';

type SearchModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const { searchQuery, setSearchQuery, searchResults, performSearch } =
    useSearch();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Focus the input when modal becomes visible
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  useEffect(() => {
    // Perform search when query changes
    performSearch(searchQuery);
  }, [searchQuery]);

  const handleResultPress = (path: string) => {
    onClose();
    setSearchQuery('');
    router.push(path as any);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const renderSearchResult = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={[
          styles.resultItem,
          { backgroundColor: theme.colors.background.card },
        ]}
        onPress={() => handleResultPress(item.path)}
      >
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.resultImage} />
        )}
        <View style={styles.resultContent}>
          <Text
            style={[styles.resultTitle, { color: theme.colors.text.primary }]}
          >
            {item.title}
          </Text>
          <Text style={[styles.resultType, { color: theme.colors.text.muted }]}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background.main },
        ]}
      >
        <View
          style={[
            styles.searchHeader,
            { backgroundColor: theme.colors.background.card },
          ]}
        >
          <View
            style={[
              styles.searchInputContainer,
              { backgroundColor: theme.colors.background.highlight },
            ]}
          >
            <SearchIcon size={20} color={theme.colors.text.muted} />
            <TextInput
              ref={inputRef}
              style={[styles.searchInput, { color: theme.colors.text.primary }]}
              placeholder="Search for recipes, workouts, etc."
              placeholderTextColor={theme.colors.text.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              returnKeyType="search"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch}>
                <X size={20} color={theme.colors.text.muted} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text
              style={[styles.closeButtonText, { color: theme.colors.primary }]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            contentContainerStyle={styles.resultsList}
            keyboardShouldPersistTaps="handled"
          />
        ) : searchQuery.length > 0 ? (
          <View style={styles.emptyState}>
            <Text
              style={[
                styles.emptyStateText,
                { color: theme.colors.text.muted },
              ]}
            >
              No results found for "{searchQuery}"
            </Text>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text
              style={[
                styles.emptyStateText,
                { color: theme.colors.text.muted },
              ]}
            >
              Search for recipes, workouts, recovery tips, and products
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    paddingVertical: 8,
  },
  closeButton: {
    marginLeft: 16,
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  resultContent: {
    flex: 1,
    marginLeft: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  resultType: {
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SearchModal;
