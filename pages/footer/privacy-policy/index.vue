<template>
  <div class="font-sans w-full overflow-x-hidden pt-[80px] md:pt-[80px] px-[15px] text-gray-900">
    <header class="text-center py-10 border-b border-gray-200">
      <h1 class="text-[55px] xl:scale-y-[1.5] xl:scale-x-[1.8] space-y-[-15px] xl:text-[75px] font-bold">
        Privacy <span class="text-rose-600">Policy</span>
      </h1>
    </header>

    <div class="max-w-4xl mx-auto p-6">
      <p class="text-base text-rose-800 mb-8 leading-relaxed">
        At StaySuite, we value your trust and are committed to safeguarding your personal information. This document outlines how we handle and protect your data to ensure a secure and seamless experience for all our guests and hosts.
      </p>

      <section class="mb-10">
        <h2 class="text-2xl font-medium text-rose-700 mb-4">
          <Icon name="material-symbols-light:shield" class="inline mr-2 text-coral-500" />
          Data Protection Measures
        </h2>
        <p class="text-rose-600 leading-relaxed">
          StaySuite employs cutting-edge security protocols to prevent unauthorized access and protect your data. Our robust systems ensure the confidentiality of your information, providing peace of mind while using our platform.
        </p>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-medium text-rose-700 mb-4">
          <Icon name="material-symbols-light:lock" class="inline mr-2 text-coral-500" />
          Secure Transactions
        </h2>
        <p class="text-rose-600 leading-relaxed">
          Your financial security is our priority. Transactions on StaySuite are encrypted with the latest technology, ensuring your payment details remain safe and secure. We do not store sensitive payment information.
        </p>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-medium text-rose-700 mb-4">
          <Icon name="material-symbols-light:check-circle" class="inline mr-2 text-coral-500" />
          Regulatory Compliance
        </h2>
        <p class="text-rose-600 leading-relaxed">
          StaySuite strictly complies with global data protection laws, including GDPR and CCPA. We regularly update our policies to align with evolving regulations, ensuring your rights are always upheld.
        </p>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-medium text-rose-700 mb-4">
          <Icon name="material-symbols-light:warning" class="inline mr-2 text-coral-500" />
          Reporting Issues
        </h2>
        <p class="text-rose-600 leading-relaxed">
          If you suspect a data breach or encounter any security concerns, contact StaySuite immediately. Our dedicated team will address your concerns promptly to ensure the safety of your data and your trust in our platform.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-medium text-rose-700 mb-4">
          <Icon name="material-symbols-light:shield" class="inline mr-2 text-coral-500" />
          Contact StaySuite
        </h2>
        <p class="text-rose-600 leading-relaxed">
          For any questions about our privacy practices, reach out to us at
          <a href="mailto:privacy@airbnb.com" class="text-coral-500 underline">privacy@airbnb.com</a>.
          Your concerns are our priority, and we’re here to help.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>