// import Link from "next/link";

// export default function Categories({ tags }) {
//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-xl font-semibold mb-4">Categories</h2>
//             {tags.map((tag, index) => (
//                 <p key={index}>{tag}</p>
//             ))}
//         </div>
//     );
// }

import Link from "next/link";

export default function Categories({ tags }) {
    return (
        <div className="container mx-auto p-4">
            <nav className="flex flex-wrap gap-4">
                {tags.map((tag, index) => (
                    <Link
                        href={{
                            pathname: "/product",
                            query: { search: encodeURIComponent(tag) },
                        }}
                        key={index}
                    >

                        {tag}

                    </Link>
                ))}
            </nav>
        </div>
    );
}

