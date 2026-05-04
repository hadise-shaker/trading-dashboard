"use client";
import { useState, useEffect } from "react";
import { Mail, Lock, User, Globe } from "lucide-react";

type Props = {
  onSwitch: () => void;
};
type Country = {
    name: string;
    code: string;
};
  
export default function SignupForm({ onSwitch }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState("");

    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);          

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
      
        if (!name || !email || !password || !confirmPassword) {
          setError("Please fill in all fields");
          return;
        }
      
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
      
        setIsLoading(true);
        setError("");
      
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, country }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || "Failed to sign up");
          }
      
          // success
          onSwitch();
      
        } catch (err: any) {
          console.error(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
    };
    useEffect(() => {
        async function fetchCountries() {
          try {
            const res = await fetch("/api/countries");
            const data = await res.json();
      
            setCountries(data);
          } catch (err) {
            console.error("Failed to load countries", err);
          } finally {
            setIsLoadingCountries(false);
          }
        }
      
        fetchCountries();
    }, []);
  return (
    <div className="text-black w-full max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>

        <h2 className="text-2xl font-semibold mb-2">
            Create your account
        </h2>

        <p className="text-sm text-zinc-500 mb-6">
            Join thousands of traders worldwide
        </p>

        <div className="space-y-6">

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-2 gap-4">

            {/* Full Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                Full Name
                </label>

                <div className="relative">
                <User className="input-icon" size={20} />
                <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="input p-2.5 pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                Email
                </label>

                <div className="relative">
                <Mail className="input-icon" size={20} />
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input p-2.5 pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
            </div>
            </div>

            {/* Row 2: Password + Confirm */}
            <div className="grid grid-cols-2 gap-4">

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-2">
                Password
                </label>

                <div className="relative">
                <Lock className="input-icon" size={20} />
                <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="input p-2.5 pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700 mb-2">
                Confirm Password
                </label>

                <div className="relative">
                <Lock className="input-icon" size={20} />
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="input p-2.5 pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
            </div>
            </div>

            {/* Country - full width */}
            <div>
                <label htmlFor="country" className="block text-sm font-medium text-zinc-700 mb-2">
                    Country
                </label>

                <div className="relative">
                    <Globe className="input-icon" size={20} />

                    <select
                        id="country"
                        className="input p-2.5 pl-10 appearance-none"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        disabled={isLoadingCountries}
                    >
                        <option value="">
                            {isLoadingCountries ? "Loading countries..." : "Select your country"}
                        </option>

                        {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                            {c.name}
                            </option>
                        ))}
                        </select>
                </div>
            </div>

            {/* Button */}
            <button type="submit" className="btn-primary w-full"  disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <p className="text-sm text-zinc-500 mt-6 text-center">
            Already have an account?
            <button
            type="button" 
            onClick={onSwitch}
            className="ml-2 text-blue-600 hover:underline font-medium"
            >
            Log in
            </button>
        </p>
      </form>
    </div>
  );
}