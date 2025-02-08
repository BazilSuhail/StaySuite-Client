<template>
    <div class='flex overflow-x-hidden xl:w-[88vw] lg:px-[30px] xl:px-0 px-[15px] mx-auto relative'>
        <div class="flex bg-white overflow-x-auto gap-x-[35px] py-4 no-scrollbar relative">
            <div v-for="(category, index) in categories" :key="index" @click="selectCategory(category.name)"
                :class="['flex cursor-pointer flex-col justify-center items-center hover:text-gray-700 font-[600] transition duration-200',
                 selectedCategory === category.name ? 'text-gray-800' : 'text-gray-400']">
                <Icon :name="category.icon" class="text-[25px] mb-[3px]" />
                <p class="text-center text-[12px]">{{ category.name }}</p>
            </div>

        </div>
        <div
        class="absolute top-0 right-0 h-full w-[90px] bg-gradient-to-l from-white via-white/30 to-transparent pointer-events-none" />
    </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    selectedCategory: {
        type: String,
        default: 'All',
    },
});

const emit = defineEmits(['update:category']);

const categories = ref([
    { name: 'All', icon: 'fa-solid:border-all' },
    { name: 'Apartment', icon: 'fa-solid:building' },
    { name: 'Mountain', icon: 'fa-solid:mountain' },
    { name: 'Mansions', icon: 'fa-solid:snowflake' },
    { name: 'Hotel', icon: 'fa-solid:hotel' },
    { name: 'Castle', icon: 'mdi:castle' },
    { name: 'House', icon: 'fa-solid:home' },
    { name: 'Villa', icon: 'fa-solid:tree' },
    { name: 'Condo', icon: 'fa-solid:city' },
    { name: 'Cabin', icon: 'fa-solid:fire-alt' },
    { name: 'Beachfront', icon: 'fa-solid:umbrella-beach' },
    { name: 'Campground', icon: 'fa-solid:campground' },
    { name: 'Room', icon: 'fa-solid:bed' },
    { name: 'Warehouse', icon: 'fa-solid:warehouse' },
    { name: 'Boat', icon: 'fa-solid:ship' },
    { name: 'RV', icon: 'fa-solid:caravan' },
    { name: 'Island', icon: 'fa-solid:anchor' },
    { name: 'Eco', icon: 'fa-solid:globe' },
    { name: 'Poolside', icon: 'fa-solid:swimming-pool' },
    { name: 'Pet', icon: 'fa-solid:dog' },
    { name: 'Spa', icon: 'fa-solid:spa' },
]);

const selectCategory = (category) => {
    emit('update:category', category);
};
</script>