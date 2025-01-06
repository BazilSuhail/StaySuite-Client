<template>
    <main class="bg-gray-100 p-4 min-h-screen flex flex-col justify-center items-center pt-[100px] w-full h-full">
        <div class="max-w-2xl">
            <h3 class="text-[38px] text-rose-600 font-[700] text-center">Add Listing</h3>
            <p class="text-rose-900 mb-[20px] font-[600] px-[25px] lg:px-[85px] text-center text-[13px]">
                Create your property listing by providing all the necessary details with accurate information to attract
                potential guests, include captivating descriptions, amenities, and high-quality images to make your
                listing stand out.
            </p>
        </div>
        <div class="max-w-2xl overflow-hidden p-6 h-[460px] bg-white shadow border rounded-[25px]">
            <component :is="currentComponent" :form-data="formData" :set-form-data="setFormData"
                :handle-change="handleChange" :set-current-step="setCurrentStep" :handle-submit="handleSubmit"
                :handle-amenity-add="handleAmenityAdd" :handle-amenity-change="handleAmenityChange"
                :handle-amenity-remove="handleAmenityRemove" :handle-file-change="handleFileChange"
                :handle-file-submit="handleFileSubmit" :upload-method="uploadMethod"
                :set-upload-method="setUploadMethod" :additional-images="formData.additionalImages"
                @update:additionalImages="(updatedImages) => { formData.additionalImages = updatedImages; }" />
        </div>
    </main>
</template>

<script>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

// Import steps as components
import Step1 from "@/components/AddListing_Component/Step1.vue";
import Step2 from "@/components/AddListing_Component/Step2.vue";
import Step3 from "@/components/AddListing_Component/Step3.vue";
import Step4 from "@/components/AddListing_Component/Step4.vue";
import Step5 from "@/components/AddListing_Component/Step5.vue";
import Step6 from "@/components/AddListing_Component/Step6.vue";
import Step7 from "@/components/AddListing_Component/Step7.vue";
import Step8 from "@/components/AddListing_Component/Step8.vue";
import Step9 from "@/components/AddListing_Component/Step9.vue";

export default {
    components: { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9 },

    setup() {
        const currentStep = ref(5);
        const uploadMethod = ref("url");
        const formData = reactive({
            name: "11",
            summary: "a",
            property_type: "a",
            maxGuests: 2,
            bedrooms: 1,
            bathrooms: 1,
            category: "Apartment",
            price: 11100,
            address: { street: "1", suburb: "1", country: "1" },
            amenities: ["1"],
            images: { placePicture: "", coverPicture: "", additionalPictures: [] },
            additionalImages: Array(5).fill(null), // Initialize the array
        });

        const setFormData = (newData) => {
            Object.assign(formData, newData);
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            if (name.includes("address.")) {
                const field = name.split(".")[1];
                formData.address[field] = value;
            } else if (name.includes("images.")) {
                const field = name.split(".")[1];
                formData.images[field] = value;
            } else {
                formData[name] = value;
            }
        };

        const handleAmenityAdd = () => {
            if (formData.amenities.length >= 5) {
                alert("You can only add up to 5 amenities.");
                return;
            }
            formData.amenities.push("");
        };

        const handleAmenityChange = (index, value) => {
            formData.amenities[index] = value;
        };

        const handleAmenityRemove = (index) => {
            formData.amenities.splice(index, 1);
        };

        const handleSubmit = async () => {
            try {
                console.log(formData)
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/add-listing`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("listing is added");
            } catch (error) {
                console.error("Error adding listing:", error);
                alert("Failed to add listing. Please try again.");
            }
        };

        const handleFileChange = (e) => {
            const files = Array.from(e.target.files);
            formData.additionalImages = files;
        };

        const handleFileSubmit = async () => {
            const formDataToSend = new FormData();

            // Append non-image form data
            formDataToSend.append('name', formData.name);
            formDataToSend.append('summary', formData.summary);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('property_type', formData.property_type);
            formDataToSend.append('maxGuests', formData.maxGuests);
            formDataToSend.append('bedrooms', formData.bedrooms);
            formDataToSend.append('bathrooms', formData.bathrooms);
            formDataToSend.append('price', formData.price);

            // Append address as a JSON string
            const address = {
                street: formData.address.street,
                suburb: formData.address.suburb,
                country: formData.address.country,
            };
            formDataToSend.append('address', address);

            // Append amenities as a JSON string
            formDataToSend.append('amenities', formData.amenities);

            // Create an image object
            //const images = {};// Append images properly as FormData fields
if (formData.placeImage) {
    formDataToSend.append('images[placeImage]', formData.placeImage);
}
if (formData.coverImage) {
    formDataToSend.append('images[coverImage]', formData.coverImage);
}
if (formData.additionalImages && formData.additionalImages.length > 0) {
    formData.additionalImages.forEach((image, index) => {
        formDataToSend.append(`images[additionalImages][${index}]`, image);
    });
}
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/add-listing-with-images`,
                    formDataToSend,
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert(response.data.message);
            } catch (error) {
                console.error("Error submitting listing with images:", error);
                alert("Failed to submit the listing. Please try again.");
            }
        };


        const currentComponent = computed(() => {
            if (uploadMethod.value === "url" && currentStep.value === 6) return Step6;
            if (uploadMethod.value === "url" && currentStep.value === 7) return Step7;
            if (uploadMethod.value === "file" && currentStep.value === 8) return Step8;
            if (uploadMethod.value === "file" && currentStep.value === 9) return Step9;
            return {
                1: Step1,
                2: Step2,
                3: Step3,
                4: Step4,
                5: Step5,
            }[currentStep.value];
        });

        onMounted(() => {
            window.scrollTo(0, 0);
        });

        return {
            currentStep,
            currentComponent,
            uploadMethod,
            formData,
            setFormData,
            handleChange,
            setCurrentStep: (step) => (currentStep.value = step),
            handleSubmit,
            handleAmenityAdd,
            handleAmenityChange,
            handleAmenityRemove,
            handleFileChange,
            handleFileSubmit,
            setUploadMethod: (method) => (uploadMethod.value = method),
        };
    },
};
</script>