import { Github } from 'lucide-react';

export default function DeveloperFooter() {
  return (
    <div className="w-full pt-6 border-t border-gray-200 text-sm text-gray-600 mt-10">
      <p className="text-center text-gray-400 font-semibold mb-1">👨‍💻 개발자 소개</p>

      <div className="flex justify-center items-center gap-10 mb-3">
        {/* 프론트엔드 */}
        <a
          href="https://github.com/jeong011010"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <Github size={18} />
          <span>CSE 김정훈 <br/>[프론트엔드]</span>
        </a>

        {/* 백엔드 */}
        <a
          href="https://github.com/tejava7177"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <Github size={18} />
          <span>CSE 심주흔 <br/>[백엔드]</span>
        </a>
      </div>

      <p className="text-center text-gray-400 text-sm">email: jeong01101095@gmail.com</p>
      <p className="text-center text-gray-400 text-sm mt-1">ⓒ 2025 WeNixia Festival</p>
    </div>
  );
}