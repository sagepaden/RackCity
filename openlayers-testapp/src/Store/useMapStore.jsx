import { create } from 'zustand';

const useMapStore = create((set) => ({
	map: nill,
	populateMap: (mapGenerated) => set((state) => ({ map: mapGenerated })),
	removeMap: () => set({ map: null }),
}));

export default useMapStore;
