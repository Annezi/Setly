// Отключаем статический пререндер страницы (тяжёлая форма с большим состоянием)
export const dynamic = "force-dynamic";

export default function CreateCheckplanLayout({ children }) {
	return children;
}
