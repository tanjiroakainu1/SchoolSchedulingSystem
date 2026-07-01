import { runChatbotSelfTest } from '../src/services/chatbotEngine.ts';

const { passed, failed, results } = runChatbotSelfTest();

console.log('\n🤖 Scheduly AI — Chatbot Self-Test\n');
console.log('═'.repeat(40));
results.forEach((r) => console.log(r));
console.log('═'.repeat(40));
console.log(`\nResults: ${passed} passed, ${failed} failed out of ${passed + failed} tests\n`);

if (failed > 0) {
  process.exit(1);
}
