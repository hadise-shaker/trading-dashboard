"use client";

import { useState } from "react";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

type Props = {
	onSwitch: () => void;
};

export default function LoginForm({ onSwitch }: Props) {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}
        
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Invalid credentials");
			}

			window.location.href = "/dashboard";
		} catch (err) {
            console.error(err);
			setError("Invalid email or password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-lg mx-auto">
			<form onSubmit={handleSubmit}>
				<h2 className="text-2xl font-semibold mb-2">Welcome back</h2>

				<p className="text-sm mb-6">
					Please sign in to your account
				</p>

				<div className="space-y-6">
					<div className="relative">
						<label
							htmlFor="email"
							className="block text-sm font-medium mb-2"
						>
							Email
						</label>

						<div className="relative">
							<Mail className="input-icon" size={20} />
							<input
								id="email"
								type="email"
								placeholder="Enter your email"
								className="input p-2.5! pl-10!"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>

					<div className="relative">
						<label
							htmlFor="password"
							className="block text-sm font-medium mb-2"
						>
							Password
						</label>

						<div className="relative">
							<LockKeyhole className="input-icon" size={20} />

							<input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								className="input p-2.5! pl-10! pr-10!"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5168]"
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<div className="flex items-center justify-between text-sm">
						<label className="flex items-center gap-2 cursor-pointer">
							<input type="checkbox" className="accent-blue-600" />
							Remember me
						</label>

						<button className="text-[#3B82F6] hover:underline">
							Forgot password?
						</button>
					</div>

					<button type="submit" className="btn-primary" disabled={isLoading}>
						{isLoading ? "Logging in..." : "Log In"}
					</button>
					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				</div>

				<div className="flex items-center gap-3 my-6">
					<div className="flex-1 h-px bg-[#1E2230]" />
					<span className="text-xs text-[#4A5168]">or continue with</span>
					<div className="flex-1 h-px bg-[#1E2230]" />
				</div>

				<div className="flex gap-3">
					<button className="social-btn hover:bg-gray-100 font-semibold">
						<img src="/icons/google.svg" className="w-4 h-4" />
						Google
					</button>

					<button className="social-btn hover:bg-gray-100 font-semibold">
						<img src="/icons/apple.svg" className="w-4 h-4" />
						Apple
					</button>
				</div>

				<p className="text-sm mt-6 text-center">
					Don't have an account?
					<button
						type="button" 
						onClick={onSwitch}
						className="ml-2 text-[#3B82F6] hover:underline font-medium"
					>
						Sign up
					</button>
				</p>
			</form>
		</div>
	);
}
