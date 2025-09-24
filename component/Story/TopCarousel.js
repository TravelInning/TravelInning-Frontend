// src/component/Story/TopCarousel.jsx
import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SCREEN_WIDTH, theme } from "../../colors/color";
import StoryBox from "./StoryBox";

const TopCarousel = ({
  data,
  activeSlide,
  setActiveSlide,
  onToggleScrap,
  onBlockRoom,
  filterVisible,
}) => {
  return (
    <View style={styles.topContainer}>
      {filterVisible ? (
        <View style={[styles.carouselItemContainer, { marginBottom: 2 }]}>
          {data[activeSlide] && (
            <StoryBox
              item={data[activeSlide]}
              onToggleScrap={onToggleScrap}
              onBlockRoom={onBlockRoom}
            />
          )}
        </View>
      ) : (
        <Carousel
          loop
          width={SCREEN_WIDTH}
          height={200}
          autoPlay
          data={data}
          scrollAnimationDuration={2500}
          onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.carouselItemContainer}>
              <StoryBox
                item={item}
                onToggleScrap={onToggleScrap}
                onBlockRoom={onBlockRoom}
              />
            </View>
          )}
          style={{ height: 106 }}
        />
      )}
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeSlide && { backgroundColor: theme.main_blue },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    alignItems: "center",
    borderColor: theme.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 30,
    backgroundColor: "#EDEDED",
    marginHorizontal: 5,
  },
  carouselItemContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
});

export default memo(TopCarousel);
