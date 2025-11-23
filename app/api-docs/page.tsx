"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function APIDocsPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load Swagger UI CSS and JS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/swagger-ui-dist@5/swagger-ui.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js";
        script.onload = () => {
            // @ts-ignore
            window.SwaggerUIBundle({
                url: "/api/docs",
                dom_id: "#swagger-ui",
                deepLinking: true,
                presets: [
                    // @ts-ignore
                    window.SwaggerUIBundle.presets.apis,
                    // @ts-ignore
                    window.SwaggerUIBundle.SwaggerUIStandalonePreset
                ],
                layout: "BaseLayout"
            });
            setLoading(false);
        };
        document.body.appendChild(script);

        return () => {
            document.head.removeChild(link);
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-fraunces mb-4">MeddyCare API Documentation</h1>
                    <p className="text-purple-100 text-lg">
                        Comprehensive API reference for integrating with MeddyCare platform
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                        <span className="ml-3 text-slate-600">Loading API documentation...</span>
                    </div>
                )}
                <div id="swagger-ui"></div>
            </div>
        </div>
    );
}
